import AsyncStorage from '@react-native-async-storage/async-storage';
import {format} from 'date-fns';

export interface PlantProps {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: string;
  frequency: {
    times: number;
    repeat_every: string;
  };
  timeNotification: Date;
  hour: string;
}

interface StoragePlantProps {
  [id: string]: {
    data: PlantProps;
  };
}

export async function loadPlants(): Promise<PlantProps[]> {
  try {
    const data = await AsyncStorage.getItem('@plantManager:plants');
    const storagedPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const plants = Object.keys(storagedPlants)
      .map(plant => {
        return {
          ...storagedPlants[plant].data,
          hour: format(
            new Date(storagedPlants[plant].data.timeNotification),
            'HH:mm',
          ),
        };
      })
      .sort((a, b) =>
        Math.floor(
          new Date(a.timeNotification).getTime() / 100 -
            Math.floor(new Date(b.timeNotification).getTime() / 100),
        ),
      );

    return plants;
  } catch (error) {
    throw new Error(error);
  }
}

export async function savePlant(plant: PlantProps): Promise<void> {
  try {
    const nextTime = new Date(plant.timeNotification);
    const now = new Date();

    const {times, repeat_every} = plant.frequency;

    if (repeat_every === 'week') {
      const interval = Math.trunc(7 / times);
      nextTime.setDate(now.getTime() + interval);
    } else {
      nextTime.setDate(nextTime.getDate() + 1);
    }

    const data = await AsyncStorage.getItem('@plantManager:plants');
    const oldPants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const newPlant = {
      [plant.id]: {
        data: plant,
      },
    };

    await AsyncStorage.setItem(
      '@plantManager:plants',
      JSON.stringify({
        ...newPlant,
        ...oldPants,
      }),
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function removePlant(plant: PlantProps): Promise<void> {
  try {
    const data = await AsyncStorage.getItem('@plantManager:plants');
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    delete plants[plant.id];

    await AsyncStorage.setItem('@plantManager:plants', JSON.stringify(plants));
  } catch (error) {
    throw new Error(error);
  }
}

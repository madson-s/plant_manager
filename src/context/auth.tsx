import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextData {
  user: string;
  plants: [] | null;
  loading: boolean;
  setUserName(name: string): Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState('');
  const [plants, setPlants] = useState<[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData() {
      const storagedPlants = await AsyncStorage.getItem('@plantManager:plants');
      const storagedName = await AsyncStorage.getItem('@plantManager:user');

      if (storagedPlants) {
        setPlants(JSON.parse(storagedPlants));
      }

      if (storagedName) {
        setUser(storagedName);
      }

      setLoading(false);
    }
    loadStoragedData();
  }, []);

  async function setUserName(name: string) {
    await AsyncStorage.setItem('@plantManager:user', name);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        plants,
        loading,
        setUserName,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

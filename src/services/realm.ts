import Realm from 'realm'
import { Plant } from '../schemas/PlantSchema'

export async function getRealm() {
  const realm = await Realm.open({
    schema: [Plant],
  })

  return realm
}
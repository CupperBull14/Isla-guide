import type { Dinosaur } from '../../types'
import { tyrannosaurus } from './tyrannosaurus'

export const dinosaurs: Dinosaur[] = [tyrannosaurus]

export const getDinosaurById = (id: string): Dinosaur | undefined =>
  dinosaurs.find((d) => d.id === id)

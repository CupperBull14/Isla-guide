import type { Dinosaur } from '../../types'
import { dryosaurus } from './dryosaurus'
import { hypsilophodon } from './hypsilophodon'
import { pachycephalosaurus } from './pachycephalosaurus'
import { tenontosaurus } from './tenontosaurus'
import { gallimimus } from './gallimimus'
import { triceratops } from './triceratops'
import { stegosaurus } from './stegosaurus'
import { carnotaurus } from './carnotaurus'
import { herrerasaurus } from './herrerasaurus'
import { maiasaura } from './maiasaura'
import { tyrannosaurus } from './tyrannosaurus'
import { allosaurus } from './allosaurus'
import { ceratosaurus } from './ceratosaurus'
import { deinosuchus } from './deinosuchus'
import { dilophosaurus } from './dilophosaurus'
import { austroraptor } from './austroraptor'
import { troodon } from './troodon'
import { omniraptor } from './omniraptor'
import { pteranodon } from './pteranodon'
import { diabloceratops } from './diabloceratops'
import { kentrosaurus } from './kentrosaurus'
import { beipiaosaurus } from './beipiaosaurus'

export const dinosaurs: Dinosaur[] = [
  dryosaurus,
  hypsilophodon,
  pachycephalosaurus,
  tenontosaurus,
  gallimimus,
  triceratops,
  stegosaurus,
  carnotaurus,
  herrerasaurus,
  maiasaura,
  tyrannosaurus,
  allosaurus,
  ceratosaurus,
  deinosuchus,
  dilophosaurus,
  austroraptor,
  troodon,
  omniraptor,
  pteranodon,
  diabloceratops,
  kentrosaurus,
  beipiaosaurus,
]

export const getDinosaurById = (id: string): Dinosaur | undefined =>
  dinosaurs.find((d) => d.id === id)

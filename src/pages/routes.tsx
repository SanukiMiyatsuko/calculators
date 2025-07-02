import type { JSX } from "react"
import SubspeciesTwo from "./twoVariablesPsi/subspeciesTwo/SubspeciesTwo";
import SubspeciesMulti from "./multiVariablesPsi/subspeciesMulti/SubspeciesMulti";
import ItalyTwo from "./twoVariablesPsi/italyTwo/ItalyTwo";
import StomachTwo from "./twoVariablesPsi/stomachTwo/StomachTwo";
import OldSubspeciesTwo from "./twoVariablesPsi/oldSubspeciesTwo/OldSubspeciesTwo";
import OldSubspeciesMulti from "./multiVariablesPsi/oldSubspeciesMulti/oldSubspeciesMulti";
import BTwo from "./twoVariablesPsi/bTwo/BTwo";
import BuchholzTwo from "./twoVariablesPsi/buchholzTwo/BuchholzTwo";
import BuchholzMulti from "./multiVariablesPsi/buchholzMulti/BuchholzMulti";
import GoalTwo from "./twoVariablesPsi/goalTwo/GoalTwo";
import BambooTwo from "./twoVariablesPsi/bambooTwo/BambooTwo";
import MushroomTwo from "./twoVariablesPsi/mushroomTwo/MushroomTwo";
import Worm from "./sequenceSystem/worm/Worm";
import ExtendedWorm from "./extendedSequenceSystem/extendedWorm/ExtendedWorm";
import SideWorm from "./sequenceSystem/sideWorm/SideWorm";
import ExtendedSideWorm from "./extendedSequenceSystem/extendedSideWorm/ExtendedSideWorm";
import GeneralizedPenetrating from "./sequenceSystem/generalizedPenetrating/GeneralizedPenetrating";
import SecondOrderSearching from "./sequenceSystem/secondOrderSearching/SecondOrderSearching";

export const routes: {
  path: string;
  name: string;
  element: JSX.Element;
}[] = [
  { path: "/subspeciesTwo", name: "亜関数", element: <SubspeciesTwo /> },
  { path: "/subspeciesMulti", name: "多変数亜関数", element: <SubspeciesMulti /> },
  { path: "/italyTwo", name: "伊関数", element: <ItalyTwo /> },
  { path: "/stomachTwo", name: "胃関数", element: <StomachTwo /> },
  { path: "/oldSubspeciesTwo", name: "亞関数", element: <OldSubspeciesTwo /> },
  { path: "/oldSubspeciesMulti", name: "多変数亞関数", element: <OldSubspeciesMulti /> },
  { path: "/bTwo", name: "B関数", element: <BTwo /> },
  { path: "/buchholzTwo", name: "ブーフホルツのψ", element: <BuchholzTwo /> },
  { path: "/buchholzMulti", name: "くまくま(大嘘)多変数ψ", element: <BuchholzMulti /> },
  { path: "/goalTwo", name: "Goal関数", element: <GoalTwo /> },
  { path: "/bambooTwo", name: "横竹関数", element: <BambooTwo /> },
  { path: "/mushroomTwo", name: "横茸関数", element: <MushroomTwo /> },
  { path: "/worm", name: "ベクレミシェフの虫", element: <Worm /> },
  { path: "/extendedWorm", name: "拡張ベクレミシェフの虫", element: <ExtendedWorm /> },
  { path: "/sideWorm", name: "横ベクレミシェフ", element: <SideWorm /> },
  { path: "/extendedSideWorm", name: "拡張横ベクレミシェフ", element: <ExtendedSideWorm /> },
  { path: "/generalizedPenetrating", name: "汎貫通数列", element: <GeneralizedPenetrating /> },
  { path: "/secondOrderSearching", name: "2階探索数列", element: <SecondOrderSearching /> },
];
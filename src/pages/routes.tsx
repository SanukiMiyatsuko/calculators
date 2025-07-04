import type { JSX } from "react"
import ZeroTwo from "./twoVariablesPsi/a-zero/Page";
import ZeroMulti from "./multiVariablesPsi/a-zero/Page";
import SubspeciesTwo from "./twoVariablesPsi/b-subspecies/Page";
import SubspeciesMulti from "./multiVariablesPsi/b-subspecies/Page";
import ItalyTwo from "./twoVariablesPsi/c-italy/Page";
import StomachTwo from "./twoVariablesPsi/d-stomach/Page";
import OldSubspeciesTwo from "./twoVariablesPsi/e-oldSubspecies/Page";
import OldSubspeciesMulti from "./multiVariablesPsi/c-oldSubspecies/Page";
import BTwo from "./twoVariablesPsi/f-b/Page";
import BuchholzTwo from "./twoVariablesPsi/g-buchholz/Page";
import BuchholzMulti from "./multiVariablesPsi/d-buchholz/Page";
import GoalTwo from "./twoVariablesPsi/h-goal/Page";
import BambooTwo from "./twoVariablesPsi/i-bamboo/Page";
import MushroomTwo from "./twoVariablesPsi/j-mushroom/Page";
import TwoPsiCode from "./psiCode/twoPsiCode/Page";
import ThreePsiCode from "./psiCode/threePsiCode/Page";
import Worm from "./sequenceSystem/worm/Page";
import ExtendedWorm from "./extendedSequenceSystem/extendedWorm/Page";
import SideWorm from "./sequenceSystem/sideWorm/Page";
import ExtendedSideWorm from "./extendedSequenceSystem/extendedSideWorm/Page";
import GeneralizedPenetrating from "./sequenceSystem/generalizedPenetrating/Page";
import SecondOrderSearching from "./sequenceSystem/secondOrderSearching/Page";

export const routes: {
  path: string;
  name: string;
  element: JSX.Element;
}[] = [
  { path: "/zeroTwo", name: "〇関数", element: <ZeroTwo /> },
  { path: "/zeroMulti", name: "多変数〇関数", element: <ZeroMulti /> },
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
  { path: "/twoPsiCode", name: "3-ψコード", element: <TwoPsiCode /> },
  { path: "/threePsiCode", name: "3-ψコード", element: <ThreePsiCode /> },
  { path: "/worm", name: "ベクレミシェフの虫", element: <Worm /> },
  { path: "/extendedWorm", name: "拡張ベクレミシェフの虫", element: <ExtendedWorm /> },
  { path: "/sideWorm", name: "横ベクレミシェフ", element: <SideWorm /> },
  { path: "/extendedSideWorm", name: "拡張横ベクレミシェフ", element: <ExtendedSideWorm /> },
  { path: "/generalizedPenetrating", name: "汎貫通数列", element: <GeneralizedPenetrating /> },
  { path: "/secondOrderSearching", name: "2階探索数列", element: <SecondOrderSearching /> },
];
import type { JSX } from "react"
import SubspeciesTwo from "./pages/subspeciesTwo/SubspeciesTwo"
import SubspeciesMulti from "./pages/subspeciesMulti/SubspeciesMulti"
import OldSubspeciesTwo from "./pages/oldSubspeciesTwo/OldSubspeciesTwo"
import OldSubspeciesMulti from "./pages/oldSubspeciesMulti/oldSubspeciesMulti"
import BuchholzTwo from "./pages/buchholzTwo/BuchholzTwo"
import BuchholzMulti from "./pages/buchholzMulti/BuchholzMulti"
import Worm from "./pages/worm/Worm"
import ExtendedWorm from "./pages/extendedWorm/ExtendedWorm"
import SideWorm from "./pages/sideWorm/SideWorm"
import ExtendedSideWorm from "./pages/extendedSideWorm/ExtendedSideWorm"
import GeneralizedPenetrating from "./pages/generalizedPenetrating/GeneralizedPenetrating"
import SecondOrderSearching from "./pages/secondOrderSearching/SecondOrderSearching"

export const routes: {
  path: string;
  name: string;
  element: JSX.Element;
}[] = [
  { path: "/subspeciesTwo", name: "亜関数", element: <SubspeciesTwo /> },
  { path: "/subspeciesMulti", name: "多変数亜関数", element: <SubspeciesMulti /> },
  { path: "/oldSubspeciesTwo", name: "亞関数", element: <OldSubspeciesTwo /> },
  { path: "/oldSubspeciesMulti", name: "多変数亞関数", element: <OldSubspeciesMulti /> },
  { path: "/buchholzTwo", name: "ブーフホルツのψ", element: <BuchholzTwo /> },
  { path: "/buchholzMulti", name: "くまくま(大嘘)多変数ψ", element: <BuchholzMulti /> },
  { path: "/worm", name: "ベクレミシェフの虫", element: <Worm /> },
  { path: "/extendedWorm", name: "拡張ベクレミシェフの虫", element: <ExtendedWorm /> },
  { path: "/sideWorm", name: "横ベクレミシェフ", element: <SideWorm /> },
  { path: "/extendedSideWorm", name: "拡張横ベクレミシェフ", element: <ExtendedSideWorm /> },
  { path: "/generalizedPenetrating", name: "汎貫通数列", element: <GeneralizedPenetrating /> },
  { path: "/secondOrderSearching", name: "2階探索数列", element: <SecondOrderSearching /> },
];
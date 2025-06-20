import type { JSX } from "react"
import SubspeciesTwo from "./pages/subspeciesTwo/SubspeciesTwo"
import SubspeciesMulti from "./pages/subspeciesMulti/SubspeciesMulti"
import OldSubspeciesTwo from "./pages/oldSubspeciesTwo/OldSubspeciesTwo"
import OldSubspeciesMulti from "./pages/oldSubspeciesMulti/oldSubspeciesMulti"
import BuchholzTwo from "./pages/buchholzTwo/BuchholzTwo"
import BuchholzMulti from "./pages/buchholzMulti/BuchholzMulti"
import ExtendedWorm from "./pages/extendedWorm/ExtendedWorm"
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
  { path: "/extendedWorm", name: "拡張ベクレミシェフの虫", element: <ExtendedWorm /> },
  { path: "/generalizedPenetrating", name: "汎貫通数列", element: <GeneralizedPenetrating /> },
  { path: "/secondOrderSearching", name: "2階探索数列", element: <SecondOrderSearching /> },
];
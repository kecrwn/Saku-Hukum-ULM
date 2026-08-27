/** River Margin design system: every route shares a warm, source-aware document frame and a persistent shULM language preference. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteFrame } from "@/components/SiteFrame";
import ErrorBoundary from "./components/ErrorBoundary";
import { LanguageProvider } from "./contexts/LanguageContext";
import About from "./pages/About";
import Career from "./pages/Career";
import Curriculum from "./pages/Curriculum";
import Facilities from "./pages/Facilities";
import FacultyStaff from "./pages/FacultyStaff";
import Home from "./pages/Home";
import Links from "./pages/Links";
import NotFound from "./pages/NotFound";
import Perspectives from "./pages/Perspectives";
import StudentLife from "./pages/StudentLife";
import { Route, Switch } from "wouter";

function Router() { return <SiteFrame><Switch><Route path="/" component={Home} /><Route path="/tentang" component={About} /><Route path="/kurikulum" component={Curriculum} /><Route path="/fasilitas" component={Facilities} /><Route path="/dosen" component={FacultyStaff} /><Route path="/kemahasiswaan" component={StudentLife} /><Route path="/perspektif" component={Perspectives} /><Route path="/karier" component={Career} /><Route path="/tautan" component={Links} /><Route component={NotFound} /></Switch></SiteFrame>; }
export default function App() { return <ErrorBoundary><LanguageProvider><TooltipProvider><Toaster /><Router /></TooltipProvider></LanguageProvider></ErrorBoundary>; }

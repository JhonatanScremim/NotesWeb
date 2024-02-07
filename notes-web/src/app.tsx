import logo from "./assets/logo-nlw.svg";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-cart";

// space-y-6: Adiciona espaçamento de 6 em todos os elementos da div
// h-px: altura com 1 px, apenas para criar a linha na página
// outline-none: Retira borda automatica do navegador ao selecionar um input ou outro elemento

const note ={
  date: new Date(),
  content: 'Hello World'
}

export function App() {
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} alt="logo" />
      <form className="w-full">
        <input
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          type="text"
          placeholder="Busque em suas notas..."
        />
      </form>
      <div className="h-px bg-slate-700" />
      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard />
        <NoteCard note={note}/>   
        <NoteCard note={note}/>   
      </div>
    </div>
  );
}

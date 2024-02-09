import { ChangeEvent, useState } from "react";
import logo from "./assets/logo-nlw.svg";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";

// space-y-6: Adiciona espaçamento de 6 em todos os elementos da div
// h-px: altura com 1 px, apenas para criar a linha na página
// outline-none: Retira borda automatica do navegador ao selecionar um input ou outro elemento

interface Note {
  id: string;
  date: Date;
  content: string;
}

export function App() {
  const [search, setSearch] = useState("");

  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem("notes");

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    }

    return [];
  });

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content: content,
    };

    // Quando você quer atualizar as notas do useState, não pode substituir o que já está lá
    // Então deve adicionar a nova nota, e depois copiar as outras que já estavam no useState, ou vice e versa
    const notesArray = [newNote, ...notes];
    setNotes(notesArray);

    localStorage.setItem("notes", JSON.stringify(notesArray));
  }

  function onNoteDeleted(id: string) {
    const newNotesArray = notes.filter((note) => {
      return note.id !== id;
    });

    setNotes(newNotesArray);
    localStorage.setItem("notes", JSON.stringify(newNotesArray));
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;

    setSearch(query);
  }

  const filteredNotes =
    search !== ""
      ? notes.filter((note) =>
          note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : notes;

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5 md:px-0">
      <img src={logo} alt="logo" />
      <form className="w-full">
        <input
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          type="text"
          placeholder="Busque em suas notas..."
          onChange={handleSearch}
        />
      </form>
      <div className="h-px bg-slate-700" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />
        {filteredNotes.map((note) => {
          return <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />; // Sempre deve ser passado uma key para o objeto, para o react sempre poder identificar cada note
        })}
      </div>
    </div>
  );
}

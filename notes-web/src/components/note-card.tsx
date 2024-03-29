import * as Dialog from "@radix-ui/react-dialog";
//Importa tudo da biblioteca radix react dialog e coloca em um objeto chamado Dialog

import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { X } from "lucide-react";

// black/50: cor preto com opacidade de 50
// pointer-events-none: Faz com que o elemento não tenha nenhuma interação com o mouse
// hover:ring-2: Aplica box-shadow no hover do elemento sem prejudicar o tamanho
// gap-3: Ao utilizar Flex no tailwind, é utilizado gap para fazer o distanciamento
// overflow-hidden: qualquer elemento que ocupe um espaço interno além do conteudo, seja escondido, utilizado para deixar as bordas do botão arredondado
// group: ajuda a estilizar um elemento filho baseado no elemento pai, exemplo utilizado para dar underline em apenas uma parte do texto ao selecionar o botão inteiro

//Dialog.Portal: Mostra modal separado da div em que está, facilitando modal aparecer no centro da tela
//Dialog.Overlay: Após o modal abrir, o conteudo da aplicação "atras" da modal ficara escura

interface NoteCardProps {
  note: {
    id: string,
    date: Date;
    content: string;
  };

  onNoteDeleted: (id: string) => void
}

export function NoteCard(props: NoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md text-left flex flex-col bg-slate-800 p-5 gap-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
        <span className="text-sm font-medium text-slate-300">
          {formatDistanceToNow(props.note.date, {
            //Coloca o tempo que foi feito a note, exemplo: 2 days
            locale: ptBR, //Coloca o texto em portugues
            addSuffix: true, //Adiciona o prefixo "Há" ao texto, exemplo: Há 2 dias
          })}
        </span>
        <p className="text-sm leading-6 text-slate-400">{props.note.content}</p>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 overflow-hidden md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="w-5 h-5" />
          </Dialog.Close>
          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-sm font-medium text-slate-300">
              {formatDistanceToNow(props.note.date, {
                //Coloca o tempo que foi feito a note, exemplo: 2 days
                locale: ptBR, //Coloca o texto em portugues
                addSuffix: true, //Adiciona o prefixo "Há" ao texto, exemplo: Há 2 dias
              })}
            </span>
            <p className="text-sm leading-6 text-slate-400">
              {props.note.content}
            </p>
          </div>

          <button
            type="button"
            className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group"
          >
            Deseja{" "}
            <span onClick={() => props.onNoteDeleted(props.note.id)} className="text-red-400 group-hover:underline">
              apagar essa nota?
            </span>
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

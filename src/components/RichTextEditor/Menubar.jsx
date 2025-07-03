import React, { useCallback } from 'react'
import { LuHeading1, LuHeading2, LuHeading3, LuListOrdered } from "react-icons/lu";
import { FaBold, FaHighlighter, FaItalic, FaLink, FaList, FaStrikethrough, FaUnlink } from "react-icons/fa";
import { CiAlignCenterH, CiAlignLeft, CiAlignRight } from "react-icons/ci";

export default function MenuBar({editor}) {
  if (!editor) {
    return null;
  }

   const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // update link
    try {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    } catch (e) {
      alert(e.message);
    }
  }, [editor]);

  const options=[
    {
      icon: <LuHeading1 className='size-4'/>,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed:editor?.isActive("heading", { level: 1 })
    },
    {
      icon: <LuHeading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <LuHeading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <FaBold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
    },
    {
      icon: <FaItalic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
    {
      icon: <FaStrikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive("strike"),
    },
    {
      icon: <CiAlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      pressed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <CiAlignCenterH className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      pressed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <CiAlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      pressed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <FaList className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive("bulletList"),
    },
    {
      icon: <LuListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive("orderedList"),
    },
    {
      icon: <FaHighlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      pressed: editor.isActive("highlight"),
    },
    {
      icon: <FaLink className="size-4" />,
      onClick: setLink,
      pressed: editor.isActive("link"),
    },
    {
      icon: <FaUnlink className="size-4" />,
      onClick: () => editor.chain().focus().unsetLink().run(),
      pressed: false,
      disabled: !editor.isActive("link"),
    }
  ]
  return (
    <div className="border rounded-md p-1 mb-1 bg-slate-50 z-50">
    <div className="flex flex-wrap gap-1 justify-center items-center">
      {
        options.map((option, index) => (
          <button
            key={index}
            onClick={option.onClick}
            className={`btn btn-sm ${option.pressed ? 'btn-active' : 'btn-ghost'} ${option.className || ''}`}
            disabled={option.disabled || false}
          >
            {option.icon}
          </button>
        ))
      }
    </div>
    </div>
  )
}

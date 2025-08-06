import { createClient } from "@/lib/supabase/server"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"
import { revalidatePath } from "next/cache"

interface EditNotePageProps {
  params: {
    id: string
  }
}

export default async function EditNotePage({ params }: EditNotePageProps) {
  const noteId = params.id

  const supabase = createClient()
  const { data: note, error } = await supabase
    .from("notes")
    .select("id, title")
    .eq("id", noteId)
    .single()

  if (error || !note) {
    return notFound()
  }

  async function updateNote(formData: FormData) {
    "use server"

    const title = formData.get("title") as string

    const supabase = createClient()
    const { error } = await supabase
      .from("notes")
      .update({ title })
      .eq("id", noteId)

    if (!error) {
      revalidatePath("/notes")
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-green-400 mb-4 font-mono">Edit Note</h1>
      <form action={updateNote} className="space-y-4">
        <div>
          <Label htmlFor="title" className="text-green-300">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            defaultValue={note.title}
            className="mt-1 bg-black border border-green-500 text-green-200"
          />
        </div>

        {/* Optional: upload new audio file in future */}

        <Button type="submit" className="bg-green-600 hover:bg-green-700">
          Save Changes
        </Button>
      </form>
    </div>
  )
}

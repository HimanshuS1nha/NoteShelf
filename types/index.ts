export interface NoteType {
    _id: string;
    id: string;
    title: string;
    description: string;
    tag: string;
    email: string;
    shared: string;
}

export interface ParamsProps {
    params: {
        id: string;
    }
}

export interface NotesProps {
    data: NoteType;
    handleDelete: (id: string) => void;
    noteType: "Your" | "Shared"
}

export interface SessionProps {
    session: {
        user?: {
            id?: string | null;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        }
        expires: string;
    }
}
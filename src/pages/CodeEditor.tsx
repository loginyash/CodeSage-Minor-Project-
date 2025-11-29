import Navigation from "@/components/Navigation";
import CodeEditorWindow from "@/components/Editor/CodeEditorWindow";

const CodeEditor = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navigation />

            <main className="flex-1 pt-20 pb-6 px-4 container mx-auto max-w-7xl h-[calc(100vh-80px)]">
                <CodeEditorWindow />
            </main>
        </div>
    );
};

export default CodeEditor;

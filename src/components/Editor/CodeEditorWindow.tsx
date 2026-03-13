import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Loader2, Terminal, Save } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";

const LANGUAGES = {
    python: {
        name: "Python",
        version: "3.10.0",
        defaultCode: "print('Hello, Code Sage!')\n\ndef sum(a, b):\n    return a + b\n\nprint(sum(5, 3))"
    },
    javascript: {
        name: "JavaScript",
        version: "18.15.0",
        defaultCode: "console.log('Hello, Code Sage!');\n\nfunction sum(a, b) {\n    return a + b;\n}\n\nconsole.log(sum(5, 3));"
    },
    typescript: {
        name: "TypeScript",
        version: "5.0.3",
        defaultCode: "console.log('Hello, Code Sage!');\n\nfunction sum(a: number, b: number): number {\n    return a + b;\n}\n\nconsole.log(sum(5, 3));"
    },
    java: {
        name: "Java",
        version: "15.0.2",
        defaultCode: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, Code Sage!\");\n    }\n}"
    },
    cpp: {
        name: "C++",
        version: "10.2.0",
        defaultCode: "#include <iostream>\n\nint main() {\n    std::cout << \"Hello, Code Sage!\" << std::endl;\n    return 0;\n}"
    }
};

interface CodeEditorWindowProps {
    height?: string;
}

const CodeEditorWindow = ({ height = "calc(100vh - 100px)" }: CodeEditorWindowProps) => {
    const [language, setLanguage] = useState<keyof typeof LANGUAGES>("python");
    const [code, setCode] = useState(LANGUAGES["python"].defaultCode);
    const [output, setOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false);

    const handleLanguageChange = (value: string) => {
        const lang = value as keyof typeof LANGUAGES;
        setLanguage(lang);
        setCode(LANGUAGES[lang].defaultCode);
        setOutput("");
    };

    const runCode = async () => {
        setIsRunning(true);
        setOutput("");
        try {
            const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
                language: language,
                version: LANGUAGES[language].version,
                files: [
                    {
                        content: code
                    }
                ]
            });

            const { run } = response.data;
            setOutput(run.output || (run.stderr ? `Error: ${run.stderr}` : "No output"));
        } catch (error: any) {
            setOutput(`Error: ${error.message || "Failed to execute code"}`);
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full" style={{ height }}>
            {/* Editor Section */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-2 flex flex-col gap-4 h-full"
            >
                <div className="flex items-center justify-between bg-card p-3 rounded-lg border border-border">
                    <div className="flex items-center gap-4">
                        <Select value={language} onValueChange={handleLanguageChange}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Language" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(LANGUAGES).map(([key, lang]) => (
                                    <SelectItem key={key} value={key}>
                                        {lang.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <span className="text-xs text-muted-foreground">v{LANGUAGES[language].version}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Save className="w-4 h-4" />
                            Save
                        </Button>
                        <Button onClick={runCode} disabled={isRunning} className="gap-2 bg-green-600 hover:bg-green-700">
                            {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                            Run Code
                        </Button>
                    </div>
                </div>

                <div className="flex-1 rounded-lg overflow-hidden border border-border shadow-2xl min-h-[400px]">
                    <Editor
                        height="100%"
                        language={language}
                        value={code}
                        theme="vs-dark"
                        onChange={(value) => setCode(value || "")}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            padding: { top: 16 },
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                        }}
                    />
                </div>
            </motion.div>

            {/* Output Section */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-1 h-full"
            >
                <Card className="h-full flex flex-col border-border bg-card/50 backdrop-blur">
                    <CardHeader className="py-4 border-b border-border">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Terminal className="w-5 h-5 text-primary" />
                            Output
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 overflow-hidden relative">
                        <div className="absolute inset-0 p-4 font-mono text-sm overflow-auto whitespace-pre-wrap text-green-400 bg-black/90">
                            {output || <span className="text-muted-foreground italic">Run your code to see output here...</span>}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default CodeEditorWindow;

import fs from "fs"
import matter from "gray-matter"
import path from "path"

function walk(dir: string): string[] {
    return fs.readdirSync(dir).flatMap(file => {
        const fullPath = path.join(dir, file)
        return fs.statSync(fullPath).isDirectory()
            ? walk(fullPath)
            : fullPath.endsWith(".md") ? [fullPath] : []
    })
}

const baseDir = path.resolve("content")
const files = walk(baseDir)

const questions = files.map(file => {
    const raw = fs.readFileSync(file, "utf-8")
    const { data, content } = matter(raw)
    const relativePath = path.relative(baseDir, file)
    const topic = relativePath.split(path.sep)[0]


    return {
        slug: file.replace(`${baseDir}/`, "").replace(".md", ""),
        title: data.title || "Untitled",
        tags: data.tags || [],
        difficulty: data.difficulty || "unknown",
        date: data.date || "1970-01-01",
        content,
        topic,
    }
})

fs.writeFileSync("src/data/questions.json", JSON.stringify(questions, null, 2))
console.log(`✅ Extracted ${questions.length} questions.`)

import React from "react";

/**
 * Lightweight markdown-to-JSX renderer for chat messages.
 * Handles: bold, italic, inline code, unordered/ordered lists, and paragraphs.
 * Does NOT use dangerouslySetInnerHTML — returns safe React elements.
 */

/** Parse inline formatting (bold, italic, inline code) within a single line. */
function parseInline(text: string): React.ReactNode[] {
    const nodes: React.ReactNode[] = [];
    // Regex matches: `code`, **bold**, *italic* (in that priority order)
    const inlineRegex = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = inlineRegex.exec(text)) !== null) {
        // Push preceding plain text
        if (match.index > lastIndex) {
            nodes.push(text.slice(lastIndex, match.index));
        }

        const raw = match[0];
        if (match[1]) {
            // Inline code
            nodes.push(
                <code key={match.index} className="bg-[#F1F5F9] text-[#EB5119] px-1.5 py-0.5 rounded text-xs font-mono">
                    {raw.slice(1, -1)}
                </code>
            );
        } else if (match[2]) {
            // Bold
            nodes.push(
                <strong key={match.index} className="font-bold">
                    {raw.slice(2, -2)}
                </strong>
            );
        } else if (match[3]) {
            // Italic
            nodes.push(
                <em key={match.index} className="italic">
                    {raw.slice(1, -1)}
                </em>
            );
        }
        lastIndex = match.index + raw.length;
    }

    // Push any trailing plain text
    if (lastIndex < text.length) {
        nodes.push(text.slice(lastIndex));
    }

    return nodes;
}

interface MarkdownBlock {
    type: "paragraph" | "ul" | "ol";
    lines: string[];
}

/** Group raw lines into logical blocks (paragraphs, unordered lists, ordered lists). */
function groupBlocks(lines: string[]): MarkdownBlock[] {
    const blocks: MarkdownBlock[] = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        // Unordered list item: starts with "- ", "* ", or "  - " etc.
        if (/^\s*[-*]\s+/.test(line)) {
            const items: string[] = [];
            while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
                items.push(lines[i].replace(/^\s*[-*]\s+/, ""));
                i++;
            }
            blocks.push({ type: "ul", lines: items });
            continue;
        }

        // Ordered list item: starts with "1. ", "2) ", etc.
        if (/^\s*\d+[.)]\s+/.test(line)) {
            const items: string[] = [];
            while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) {
                items.push(lines[i].replace(/^\s*\d+[.)]\s+/, ""));
                i++;
            }
            blocks.push({ type: "ol", lines: items });
            continue;
        }

        // Empty line — skip
        if (line.trim() === "") {
            i++;
            continue;
        }

        // Regular paragraph: collect consecutive non-empty, non-list lines
        const paraLines: string[] = [];
        while (
            i < lines.length &&
            lines[i].trim() !== "" &&
            !/^\s*[-*]\s+/.test(lines[i]) &&
            !/^\s*\d+[.)]\s+/.test(lines[i])
        ) {
            paraLines.push(lines[i]);
            i++;
        }
        if (paraLines.length > 0) {
            blocks.push({ type: "paragraph", lines: paraLines });
        }
    }

    return blocks;
}

export default function MarkdownContent({ content }: { content: string }) {
    const lines = content.split("\n");
    const blocks = groupBlocks(lines);

    return (
        <div className="flex flex-col gap-2.5 text-sm text-[#0F172A] leading-relaxed">
            {blocks.map((block, blockIdx) => {
                if (block.type === "ul") {
                    return (
                        <ul key={blockIdx} className="list-disc list-inside flex flex-col gap-1 pl-1">
                            {block.lines.map((item, i) => (
                                <li key={i}>{parseInline(item)}</li>
                            ))}
                        </ul>
                    );
                }

                if (block.type === "ol") {
                    return (
                        <ol key={blockIdx} className="list-decimal list-inside flex flex-col gap-1 pl-1">
                            {block.lines.map((item, i) => (
                                <li key={i}>{parseInline(item)}</li>
                            ))}
                        </ol>
                    );
                }

                // Paragraph
                return (
                    <p key={blockIdx}>
                        {parseInline(block.lines.join(" "))}
                    </p>
                );
            })}
        </div>
    );
}

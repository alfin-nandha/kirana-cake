import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const type = formData.get("type") as string || "uploads"; // Default to uploads if type not specified

        if (!file) {
            return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Sanitize filename: replace spaces and weird chars
        const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-");
        const filename = `${Date.now()}-${sanitizedName}`;

        // Determine target directory
        // Allowed types: products, activities, uploads
        const targetSubfolder = ["products", "activities"].includes(type) ? type : "uploads";
        const uploadDir = path.join(process.cwd(), "public", targetSubfolder);

        // Ensure directory exists
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, filename);

        await writeFile(filePath, buffer);

        // Return the public URL
        const fileUrl = `/${targetSubfolder}/${filename}`;
        return NextResponse.json({ url: fileUrl });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ message: "Upload failed" }, { status: 500 });
    }
}

import { NextResponse } from "next/server";
import { searchTracks } from "@/lib/spotifyToken";

// GET 요청 처리
export async function GET(req: Request): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "검색어가 없습니다." }, { status: 400 });
  }
  try {
    const tracks = await searchTracks(query);
    return NextResponse.json(tracks);
  } catch (error) {
    console.error("API 요청 실패:", error);
    return NextResponse.json({ error: "API 요청에 실패했습니다." }, { status: 500 });
  }
}

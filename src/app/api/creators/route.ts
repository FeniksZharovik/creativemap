import { NextRequest, NextResponse } from "next/server";
import { findCreators } from "@/lib/repos/creators";
 
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const sector = searchParams.get("sector") ?? undefined;
  const province = searchParams.get("province") ?? undefined;
  const gender = searchParams.get("gender");
  const youth = searchParams.get("youth") === "1";
  const indigenous = searchParams.get("indigenous") === "1";
  const limit = Math.min(Number(searchParams.get("limit") ?? 50), 200);
 
  const creators = await findCreators({
    sectorSlug: sector,
    provinceCode: province,
    gender: gender === "female" ? "FEMALE" : undefined,
    isYouth: youth,
    isIndigenous: indigenous,
    limit,
  });
 
  return NextResponse.json({
    count: creators.length,
    data: creators.map((c) => ({
      id: c.id,
      slug: c.slug,
      fullName: c.fullName,
      sector: c.sector.nameId,
      sectorSlug: c.sector.slug,
      city: c.city.name,
      province: c.province.name,
      bio: c.bio,
      isFemale: c.gender === "FEMALE",
      isYouth: c.isYouth,
      isIndigenous: c.isIndigenous,
      latitude: c.latitude,
      longitude: c.longitude,
    })),
  });
}
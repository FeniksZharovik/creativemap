import { NextResponse } from "next/server";
import { countCreators } from "@/lib/repos/creators";
import {
  countCreatorsBySector,
  countCreatorsByProvince,
} from "@/lib/repos/stats";
 
export async function GET() {
  const [total, bySector, byProvince, women, youth, indigenous] =
    await Promise.all([
      countCreators(),
      countCreatorsBySector(),
      countCreatorsByProvince(50),
      countCreators({ gender: "FEMALE" }),
      countCreators({ isYouth: true }),
      countCreators({ isIndigenous: true }),
    ]);
 
  return NextResponse.json({
    meta: {
      generatedAt: new Date().toISOString(),
      license: "CC BY 4.0 — open data",
      source: "CreativeMap.id (prototype)",
    },
    totals: {
      verifiedCreators: total,
      womenCreators: women,
      youthCreators: youth,
      indigenousCreators: indigenous,
    },
    bySector: bySector.map((row) => ({
      sectorSlug: row.sectorSlug,
      sectorName: row.sectorName,
      count: row.count,
    })),
    byProvince: byProvince.map((row) => ({
      provinceCode: row.provinceCode,
      provinceName: row.provinceName,
      count: row.count,
    })),
  });
}
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { unstable_noStore } from "next/cache";
import Markdown from "react-markdown";

type Roadmap = {
  id: string;
  title: string;
  description: string;
  releaseDate: string;
  version?: string;
};

export default async function RoadmapPage() {
  unstable_noStore();

  const roadmapItems = await fetch(
    `https://projectplannerai.com/api/roadmap?projectId=j574r3qbsnz6gm7grh67de1f5s7fvzcm`
  ).then(async (res) => res.json() as Promise<Roadmap[]>);

  return (
    <div className="container max-w-5xl mx-auto">
      <div className="flex flex-row justify-between mb-8">
        <h1 className="my-12 text-[28px] leading-[34px] tracking-[-0.416px] text-neutral-12 font-bold">
          产品路线图
        </h1>
      </div>

      {roadmapItems.length === 0 && (
        <div className="text-lg font-semibold">未找到产品路线图</div>
      )}

      <ul className="flex flex-col">
        {roadmapItems.map((roadmapItem) => (
          <li
            key={roadmapItem.id}
            className="relative flex w-full flex-col sm:flex-row"
          >
            <div className="flex w-full pb-4 sm:w-[200px] sm:pb-0">
              <p className="sans text-sm leading-[1.6] text-slate-11 font-normal">
                <time className="sticky top-24 text-lg" dateTime="2024-03-06">
                  {format(new Date(roadmapItem.releaseDate), "yyyy年MM月dd日", { locale: zhCN })}
                </time>
              </p>
            </div>

            <div className="relative hidden sm:flex sm:w-[100px]">
              <div className="absolute left-0.5 top-0.5 h-full w-0.5 bg-slate-200"></div>
              <div className="sticky left-0 top-[102px] mt-1.5 h-1.5 w-1.5 rounded-full bg-white"></div>
            </div>

            <div className="w-full pb-16">
              <div className="space-y-4">
                <div className="flex flex-col gap-4">
                  <h2 className="text-4xl">{roadmapItem.title}</h2>

                  <Markdown className="prose dark:prose-invert">
                    {roadmapItem.description}
                  </Markdown>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

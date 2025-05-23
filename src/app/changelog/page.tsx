import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { unstable_noStore } from "next/cache";
import Markdown from "react-markdown";

type ChangeLog = {
  id: string;
  date: string;
  title: string;
  post: string;
};

export default async function ChangelogPage() {
  unstable_noStore();

  const changelogs = await fetch(
    `https://projectplannerai.com/api/changelog?projectId=j574r3qbsnz6gm7grh67de1f5s7fvzcm`
  ).then(async (res) => res.json() as Promise<ChangeLog[]>);

  return (
    <div className="container max-w-5xl mx-auto">
      <div className="flex flex-row justify-between mb-8">
        <h1 className="my-12 text-[28px] leading-[34px] tracking-[-0.416px] text-neutral-12 font-bold">
          缩略图评分器更新日志
        </h1>
      </div>

      {changelogs.length === 0 && (
        <div className="text-lg font-semibold">未找到更新日志</div>
      )}

      <ul className="flex flex-col">
        {changelogs.map((changelog) => (
          <li
            key={changelog.id}
            className="relative flex w-full flex-col sm:flex-row"
          >
            <div className="flex w-full pb-4 sm:w-[200px] sm:pb-0">
              <p className="sans text-sm leading-[1.6] text-slate-11 font-normal">
                <time className="sticky top-24 text-lg" dateTime="2024-03-06">
                  {format(new Date(changelog.date), "yyyy年MM月dd日", { locale: zhCN })}
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
                  <h2 className="text-4xl">{changelog.title}</h2>

                  <Markdown className="prose dark:prose-invert">
                    {changelog.post}
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

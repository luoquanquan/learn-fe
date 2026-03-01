import { Link } from 'react-router'

const demos = [
  {
    title: 'AesGcm 加密存储',
    description: '使用 AesGcm 加密存储能力演示入口',
    to: '/aesGcm',
    tag: '已上线'
  }
]

const Home = () => {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100 md:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="rounded-3xl border border-white/10 bg-linear-to-br from-indigo-500/20 via-sky-400/10 to-emerald-400/10 p-8 shadow-2xl shadow-indigo-900/20 md:p-12">
          <p className="mb-4 inline-flex rounded-full border border-indigo-300/40 bg-indigo-500/20 px-3 py-1 text-xs font-semibold tracking-wide text-indigo-100">
            Web3 Playground
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">功能导航</h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-300 md:text-base">
            这里是统一的演示入口页。你可以从这里进入不同模块，后续新增功能页面时也会自动汇聚到这里。
          </p>
        </header>

        <section className="mt-10">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="text-xl font-semibold md:text-2xl">可用演示</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {demos.map((item) => (
              <article
                key={item.to}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-indigo-300/40 hover:shadow-lg hover:shadow-indigo-900/30"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <span className="rounded-full border border-emerald-300/30 bg-emerald-500/20 px-2 py-1 text-xs text-emerald-100">
                    {item.tag}
                  </span>
                </div>
                <p className="mb-6 text-sm leading-6 text-slate-300">{item.description}</p>
                <Link
                  to={item.to}
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
                >
                  进入演示
                  <span aria-hidden>→</span>
                </Link>
              </article>
            ))}

            <article className="rounded-2xl border border-dashed border-white/20 bg-slate-900/40 p-6">
              <h3 className="text-lg font-semibold text-slate-200">更多 Demo</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">预留展示位, 学习是一种信仰 ~</p>
            </article>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Home

export function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-900 mt-12">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <a href="https://thumbnail-rater-kappa.vercel.app/" className="flex items-center">
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ThumbnailRater</span>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div className="hidden sm:block"></div>
                        <div className="hidden sm:block"></div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow me</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="https://www.youtube.com/@hhwjsw711" className="hover:underline">YouTube</a>
                                </li>
                                <li>
                                    <a href="https://github.com/hhwjsw711" className="hover:underline">GitHub</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-center">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://hhwjsw711.github.io/" className="hover:underline">逐梦文化™</a>. All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>
    )
}

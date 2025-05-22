const App = () => {
  return (
    <div>
      <div className="min-h-screen bg-sky-50 grid grid-cols-1 auto-rows-min md:grid-cols-4 md:grid-rows-12 gap-8 text-base font-sans px-4 md:px-24 py-4">
        <div className="w-full bg-yellow-100 md:min-h-0 md:row-span-6 py-4">
          <p className="text-lg md:text-xl lg:text-3xl w-1/2 px-6">Create and schedule content <span className="text-purple-500">quicker.</span></p>
          <img src="/assets/images/illustration-create-post.webp" className="w-3/4 mt-2 px-5" alt="create post" />
        </div>
        <div className="w-full bg-purple-500 md:min-h-0 md:col-span-2 md:row-span-4 flex flex-col items-center gap-4">
          <p className="text-lg md:text-xl lg:text-4xl text-white pt-8">Social Media <span className="text-yellow-500">10x </span>Faster with AI</p>
          <img src="/assets/images/illustration-five-stars.webp" className="w-1/4" alt="five stars" />
          <p className="text-sm text-white">Over 4,000 5-star reviews</p>
        </div>
        <div className="w-full bg-purple-100 md:min-h-0 md:row-span-8 flex flex-col gap-4 p-8">
          <p className="text-black text-left text-2xl">Schedule to social media</p>
          <img src="assets/images/illustration-schedule-posts.webp" className="w-5/6" alt="best time to post" />
          <p className="text-sm md:text-lg">Optimize post timings to publish content at the perfect time for your audience.</p>
        </div>
        <div className="w-full bg-white md:min-h-0 md:row-span-4 flex flex-col gap-3 p-4">
          <img src="/assets/images/illustration-multiple-platforms.webp" alt="multiple followers" className="shadow-xl" />
          <p className="text-left text-2xl text-black">Manage multiple accounts and platforms</p>
        </div>
        <div className="w-full bg-yellow-500 md:min-h-0 md:row-span-4 p-3">
          <p className="text-black">Maintain a consistent posting schedule.</p>
          <img src="assets/images/illustration-consistent-schedule.webp" alt="schedule" className="w-full h-41 object-contain max-h-full" />
        </div>
        <div className="w-full bg-yellow-500 md:min-h-0 md:row-span-6 flex flex-col gap-3 p-3">
          <p className="text-lg md:text-xl lg:text-3xl text-black text-left">Write your content using AI.</p>
          <img src="/assets/images/illustration-ai-content.webp" alt="ai content" className="h-50 rounded-2xl max-h-full object-cover" />
        </div>
        <div className="w-full bg-white md:min-h-0 md:row-span-4 flex flex-col items-center gap-4 p-4">
          <p className="text-lg md:text-xl lg:text-4xl font-black">{">" + "56%"}</p>
          <p>faster audience growth</p>
          <img src="/assets/images/illustration-audience-growth.webp" className="w-3/4" alt="audience growth" />
        </div>
        <div className="w-full bg-purple-500 md:min-h-0 md:col-span-2 md:row-span-4 flex justify-around gap-4 p-5">
          <img src="/assets/images/illustration-grow-followers.webp" alt="grow followers" className="h-40" />
          <p className="text-white text-lg md:text-xl lg:text-4xl text-left w-1/2">Grow followers with non-stop content.</p>
        </div>
      </div>
    </div>
  );
};

export default App;
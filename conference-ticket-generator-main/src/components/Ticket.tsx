import type { StateType } from "../App";

export default function Ticket({ state }: { state: StateType }) {
  const eventDate = new Date(2025, 0, 31); // Month is 0-indexed (0 = January)
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const location = "Austin, TX";

  return (
    <div className="flex flex-col w-full max-w-md mx-auto gap-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold">
        Congrats, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-gradient-text-from)] to-[var(--color-gradient-text-to)]">{state.name}!</span> Your ticket is ready.
      </h1>
      
      <p className="text-center text-sm sm:text-base">
        We've emailed your ticket to <span className="text-orange-500">{state.email}</span> and will send updates in the run up to the event.
      </p>

      <div className="relative w-full">
        <img 
          src="/assets/images/pattern-ticket.svg" 
          className="w-full h-auto object-cover"
          alt="Ticket background"
        />
        
        <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-5">
          <div className="flex p-2 sm:p-3 gap-2 sm:gap-4">
            <img 
              src="/assets/images/logo-mark.svg" 
              alt="Logo" 
              className="h-6 sm:h-8 mt-1" 
            />
            <div className="flex flex-col gap-1 sm:gap-2">
              <h2 className="text-neutral-0 text-xl sm:text-2xl font-semibold">Coding Conf</h2>
              <p className="text-neutral-300 text-xs sm:text-sm">{formattedDate} / {location}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <img 
              src="/assets/images/image-avatar.jpg" 
              alt="Avatar" 
              className="h-12 sm:h-16 md:h-18 rounded-lg sm:rounded-xl" 
            />
            <div className="flex flex-col gap-1 sm:gap-2">
              <h3 className="text-lg sm:text-xl truncate">{state.name}</h3>
              <div className="flex items-center gap-1 sm:gap-2">
                <img 
                  src="/assets/images/icon-info.svg" 
                  alt="Info" 
                  className="h-4 sm:h-5"
                />
                <p className="text-xs sm:text-sm truncate">{state.github}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
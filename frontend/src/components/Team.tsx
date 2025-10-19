import React from 'react';

const members = [
  { name: 'Iman Gadzhi', role: 'Founder', img: '/team-iman.jpg' },
  { name: 'Dany Benavides', role: 'Chief Marketing Officer', img: '/team-dany.jpg' },
  { name: 'Ciaran Anderson', role: 'Copywriter', img: '/team-ciaran.jpg' },
]

export default function Team(){
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-3xl font-bold mb-8">Meet The A-Team</h3>
        <div className="grid sm:grid-cols-3 gap-6">
          {members.map(m => (
            <div key={m.name} className="text-center">
              <img src={m.img} alt={m.name} className="mx-auto rounded-full w-40 h-40 object-cover" />
              <h4 className="mt-4 font-semibold">{m.name}</h4>
              <p className="text-sm">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

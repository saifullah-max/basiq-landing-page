import React from 'react'

export default function Services(){
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">What we offer</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white shadow rounded">
            <h3 className="font-semibold">PAID ADVERTISING</h3>
            <p className="mt-3 text-sm">Ads, Just Ads. We focus purely on paid ads and scaling ROI for ecommerce & info products.</p>
          </div>

          <div className="p-6 bg-white shadow rounded">
            <h3 className="font-semibold">AD STRATEGY</h3>
            <p className="mt-3 text-sm">Full funnel ad strategy with tracking and analytics to measure ROAS & profit.</p>
          </div>

          <div className="p-6 bg-white shadow rounded">
            <h3 className="font-semibold">CREATIVE TESTING</h3>
            <p className="mt-3 text-sm">High tempo creative testing to find top converting assets quickly.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PricingFeature {
  text: string
}

interface PricingTier {
  name: string
  price: number
  description: string
  features: PricingFeature[]
  buttonText: string
  popular?: boolean
  footerText?: string
  footerLink?: {
    text: string
    href: string
  }
}

export default function Store() {
    const pricingTiers: PricingTier[] = [
        {
          name: "Free",
          price: 0,
          description: "Start your IELTS preparation with basic practice tools",
          buttonText: "Your Current Plan",
          features: [
            { text: "Access to 2 full IELTS practice tests per month" },
            { text: "Basic writing and speaking feedback" },
            { text: "Limited vocabulary exercises" },
          ],
          footerText: "Already on this plan? ",
          footerLink: {
            text: "View billing support",
            href: "#",
          },
        },
        {
          name: "Plus",
          price: 20,
          description: "Boost your IELTS score with more practice and detailed feedback",
          buttonText: "Upgrade to Plus",
          popular: true,
          features: [
            { text: "All features in Free plan" },
            { text: "10 full IELTS practice tests per month" },
            { text: "Detailed writing and speaking scoring with feedback" },
            { text: "Access to advanced vocabulary and grammar exercises" },
          ],
          footerLink: {
            text: "Subject to usage limits",
            href: "#",
          },
        },
        {
          name: "Pro",
          price: 200,
          description: "Maximize your IELTS potential with unlimited practice and premium support",
          buttonText: "Upgrade to Pro",
          features: [
            { text: "All features in Plus plan" },
            { text: "Unlimited IELTS practice tests" },
            { text: "Priority writing and speaking scoring with in-depth feedback" },
            { text: "Personalized study plans and progress tracking" },
          ],
          footerText: "Unlimited access subject to fair use policies. ",
          footerLink: {
            text: "Learn more",
            href: "#",
          },
        },
      ]

  return (
    <div className="h-full p-8 gap-14">
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingTiers.map((tier, index) => (
            <Card
              key={index}
              className={`bg-white border-gray-700 text-black h-full flex flex-col ${
                tier.popular ? "ring-2 ring-green-500" : ""
              }`}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                  {tier.popular && <Badge className="bg-[#188F09] text-white text-xs uppercase">Phổ biến</Badge>}
                </div>
                <div className="flex items-baseline mt-2">
                  <span className="text-3xl font-extrabold tracking-tight">$</span>
                  <span className="text-5xl font-extrabold tracking-tight">{tier.price}</span>
                  <span className="ml-1 text-sm font-medium text-gray-400">
                    USD/
                    <br />
                    tháng
                  </span>
                </div>
                <CardDescription className="text-black mt-2">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <Button className="w-full py-6 mb-6 bg-[#188F09] text-white font-bold" disabled ={tier.name === 'Free'}>
                  {tier.buttonText}
                </Button>
                <ul className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-black">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              {(tier.footerText || tier.footerLink) && (
                <CardFooter className="pt-4 border-t border-gray-800 mt-auto">
                  <div className="text-xs text-gray-400">
                    {tier.footerText}
                    {tier.footerLink && (
                      <a href={tier.footerLink.href} className="text-black underline hover:text-white">
                        {tier.footerLink.text}
                      </a>
                    )}
                  </div>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

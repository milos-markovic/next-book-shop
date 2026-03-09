'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import Autoplay from "embla-carousel-autoplay"
import BookCard from "./BookCard"

type SliderProps = {
  items: object[],
  slideNumber?: string,
  bgCard?: string
}

const Slider = ({items, slideNumber = "basis-1/4", bgCard = "bg-transparent"}: SliderProps) => {
  return (
    <div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="max-w-290 mx-auto"
      >
          <CarouselContent className=" ">
            {items.map((item, index) => {
              return <CarouselItem 
                    key={index} 
                    className={slideNumber}
              >
                <BookCard book={item} bgCard={bgCard} />
              </CarouselItem>
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
      </Carousel>
    </div>
  )
}

export default Slider
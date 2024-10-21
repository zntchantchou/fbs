"use client";
import { Star } from "lucide-react";
import React from "react";

type RatingProps = {
  rating: number;
};

const Rating = ({ rating }: RatingProps) => {
  const content = Array(5)
    .fill(null)
    .map((_, index) => {
      return (
        <Star
          className="w-4 h-4"
          key={index}
          color={index <= rating ? "#FFC107" : "#E4E5E9"}
        />
      );
    });
  return content;
};

export default Rating;

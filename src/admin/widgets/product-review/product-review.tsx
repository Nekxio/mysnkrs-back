import { Container, Text, IconBadge } from "@medusajs/ui"
import React, { useEffect, useState } from "react"
import axios from "axios"

import { WidgetConfig } from "@medusajs/admin"

const Reviews = ({ id }) => {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`/product/${id}/reviews`)
                setReviews(response.data.product_reviews)
            } catch (error) {
                console.error(error)
            }
        }

        fetchReviews().then(() => {
            console.log('Reviews fetched successfully');
        });
    }, [id])

    return (
        <Container title="Product Reviews">
            {reviews.length === 0 && (
                <span>There are no reviews for this product</span>
            )}
            {reviews.length > 0 &&
                reviews.map((review) => (
                    <div key={review.id}>
                        <div>
                            <div>
                                <Text>
                                    {review.title}
                                </Text>
                            </div>
                            <div>
                                {Array(review.rating)
                                    .fill(0)
                                    .map(() => (
                                        <IconBadge color="green" />
                                    ))}
                            </div>
                        </div>
                        <Text color="gray">By {review.user_name}</Text>
                        <br />
                        <Text>{review.content}</Text>
                        <br />
                        <Text color="gray">{review.created_at}</Text>
                    </div>
                ))}
        </Container>
    )
}

export const config: WidgetConfig = {
    zone: [
        "product.details.after",
    ],
}

export default Reviews

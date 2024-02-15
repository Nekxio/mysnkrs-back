// admin-route.ts
import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import ProductReviewService from "../../../services/product-review";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
    const productReviewService: ProductReviewService = req.scope.resolve("productReviewService");

    const product_reviews = await productReviewService.getProductReviews(req.params.id);

    res.status(200).json({ product_reviews });
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
    const productReviewService: ProductReviewService = req.scope.resolve("productReviewService");
    const manager: EntityManager = req.scope.resolve("manager");

    const product_review = await manager.transaction(async (transactionManager) => {
        return await productReviewService
            .withTransaction(transactionManager)
            .addProductReview(req.params.id, req.body.data);
    });

    res.status(200).json({ product_review });
}

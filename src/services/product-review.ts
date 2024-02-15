import {BaseService} from "medusa-interfaces";
import {Product} from "@medusajs/medusa";
import {ProductReview} from "../models/product-review";
import { EntityManager, Repository } from "typeorm";
import ProductReviewRepository from "../repositories/product-review";

class ProductReviewService extends BaseService {
    protected productReviewRepository_: typeof ProductReviewRepository;
    protected manager_: EntityManager;

    constructor({ productReviewRepository, manager }: { productReviewRepository: Repository<ProductReview>, manager: EntityManager }) {
        super();

        this.productReviewRepository_ = productReviewRepository;
        this.manager_ = manager;
    }

    withTransaction(transactionManager: EntityManager) {
        this.productReviewRepository_ = transactionManager.getRepository(this.productReviewRepository_.target);
        this.manager_ = transactionManager;
        return this;
    }

    async getProductReviews (product_id: Product["id"]): Promise<ProductReview[]> {
        return await this.productReviewRepository_.find({
            where: {product_id: product_id}
        });
    }

    async addProductReview (product_id: Product["id"], data: ProductReview): Promise<ProductReview> {
        if (!data.title || !data.user_name || !data.content || !data.rating) {
            throw new Error("product review requires title, user_name, content, and rating")
        }

        const createdReview = this.productReviewRepository_.create({
            product_id: product_id,
            title: data.title,
            user_name: data.user_name,
            content: data.content,
            rating: data.rating
        })
        return await this.productReviewRepository_.save(createdReview)
    }
}

export default ProductReviewService;

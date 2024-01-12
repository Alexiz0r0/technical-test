package com.example.testbackend.model.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Table(name = "carts")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long productId;
    private String productName;

    private int qty;
    private float totalPrice;

    @Transient
    private float price;

    @PostLoad
    @PostPersist
    @PostUpdate
    private void calculatePrice() {
        if (qty != 0) {
            this.price = totalPrice / qty;
        } else {
            this.price = 0.0f;
        }
    }
    public Cart(Long productId, int qty) {
        this.productId = productId;
        this.qty = qty;
    }
}

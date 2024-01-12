package com.example.testbackend.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer numOrder;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, targetEntity = Cart.class)
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private List<Cart> cartList;

    private LocalDate date;
    private float finalPrice;

    public Order(Integer numOrder, List<Cart> cartList, LocalDate localDate, float finalPrice) {
        this.numOrder = numOrder;
        this.cartList = cartList;
        this.date = localDate;
        this.finalPrice = finalPrice;
    }
}

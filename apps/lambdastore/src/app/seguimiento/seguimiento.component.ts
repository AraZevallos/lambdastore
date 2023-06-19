import { Component, OnInit } from '@angular/core';
import { Order } from './order';
import { OrdersService } from './orders.service';
import { ORDER_STATUS } from '@frontend/orders';
import { Router } from '@angular/router';

@Component({
  selector: 'frontend-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.scss'],
})
export class SeguimientoComponent implements OnInit {
  public orders: Order[];
  value: number = 50;
  orderStatus = ORDER_STATUS;
  constructor(
    private readonly ordersService: OrdersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  async cargar() {
    this.orders = await this.ordersService.getOrders();
    return console.log(this.orders);
  }

  showOrder(orderId) {
    this.router.navigateByUrl(`seguimiento/${orderId}`);
  }
}

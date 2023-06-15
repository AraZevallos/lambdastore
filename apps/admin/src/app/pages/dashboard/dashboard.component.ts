import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@frontend/orders';
import { ProductsService } from '@frontend/products';
import { combineLatest } from 'rxjs';
import { UsersService } from '../../../../../../libs/users/src/lib/services/users.service';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  statistics = [];
  basicData: any;
  numbre : any;
  constructor(
    private productService: ProductsService,
    private ordersService: OrdersService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productService.getProductsCount(),
      this.userService.getUsersCount(),
      this.ordersService.getTotalSales()
    ]).subscribe((values) => {
      this.statistics = values;
      this.basicData = {
        labels: ['Junio', 'Julio'],
        datasets: [
            {
              label: 'Ingresos',
                backgroundColor: '#42A5F5',
                data: [this.statistics[3], this.statistics[3]-300]
            },
            {
                label: 'Egresos',
                backgroundColor: '#FFA726',
                data: [this.statistics[3]-2100, this.statistics[3]-100]
            }
        ]
    };
    });

    
  }

}

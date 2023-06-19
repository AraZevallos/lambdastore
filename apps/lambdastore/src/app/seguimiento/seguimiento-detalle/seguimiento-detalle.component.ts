import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../order';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'frontend-seguimiento-detalle',
  templateUrl: './seguimiento-detalle.component.html',
  styleUrls: ['./seguimiento-detalle.component.scss'],
})
export class SeguimientoDetalleComponent implements OnInit {
  public order: Order;
  public value: number;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    const idSolicitud = this.route.snapshot.params['id'];

    this.ordenDetalle(idSolicitud);
  }

  async ordenDetalle(id: string) {
    this.order = await this.ordersService.getOrder(id);
    return console.log(this.order);
  }
}

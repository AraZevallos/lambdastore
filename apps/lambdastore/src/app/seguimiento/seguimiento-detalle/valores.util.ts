import { NzProgressStatusType } from 'ng-zorro-antd/progress';
import { SolicitudEstadoDetalle } from '../controllers/services/solicitudes/consulta/dto/solicitudDetalle.dto';
import { EstadoSolicitudEnum } from '../enums/estadoSolicitud.enum';
import { UnidadEnum } from '../enums/unidad.enum';
import { TipoSolicitudEnum } from '../enums/tipoSolicitud.enum';
import { EstadoItemEnum } from '../enums/estadoItem.enum';

export namespace ValoresUtils {
  export function obtenerProgresoSolicitud(
    codigoUnidad: UnidadEnum,
    idSolicitudEstado: EstadoSolicitudEnum
  ) {
    switch (codigoUnidad) {
      case UnidadEnum.OGPL:
        if (idSolicitudEstado === EstadoSolicitudEnum.Atendido)
          return 20;

        return 0;
      case UnidadEnum.Contabilidad:
        if (idSolicitudEstado === EstadoSolicitudEnum.Atendido)
          return 40;

        return 20;
      case UnidadEnum.Tesoreria:
        if (idSolicitudEstado === EstadoSolicitudEnum.Atendido)
          return 60;

        return 40;
      case UnidadEnum.DGA:
        if (idSolicitudEstado === EstadoSolicitudEnum.Atendido)
          return 100;

        return 80;
      default:
        return 0;
    }
  }

  export function obtenerEstadoProgresoSolicitud(
    idSolicitudEstado: EstadoSolicitudEnum
  ): NzProgressStatusType {
    if (idSolicitudEstado === EstadoSolicitudEnum.Rechazado) return 'exception';

    return null;
  }

  export function obtenerColorEstado(idSolicitudEstado: number): string {
    switch (idSolicitudEstado) {
      case EstadoSolicitudEnum.Enviado:
      case EstadoSolicitudEnum.Atendido:
        return 'success';
      case EstadoSolicitudEnum.Pendiente:
        return 'warning';
      case EstadoSolicitudEnum.Rechazado:
        return 'error';
      default:
        return 'processing';
    }
  }

  export function obtenerIconEstado(idSolicitudEstado: number): string {
    switch (idSolicitudEstado) {
      case EstadoSolicitudEnum.Atendido:
        return 'check';
      case EstadoSolicitudEnum.Pendiente:
        return 'clock-circle';
      case EstadoSolicitudEnum.Rechazado:
        return 'close';
      default:
        return 'exclamation-circle';
    }
  }

  export function obtenerIconoOficina(solicitudUnidadId: number): string {
    switch (solicitudUnidadId) {
      case UnidadEnum.OGPL:
        return 'schedule';
      case UnidadEnum.Contabilidad:
        return 'bar-chart';
      case UnidadEnum.Tesoreria:
        return 'dollar';
      case UnidadEnum.DGA:
        return 'setting';
      default:
        return 'bank';
    }
  }

  export function obtenerIconoEstado(idSolicitudEstado: number): string {
    switch (idSolicitudEstado) {
      case EstadoSolicitudEnum.Pendiente:
        return 'clock-circle';
      case EstadoSolicitudEnum.Atendido:
        return 'check-circle';
      case EstadoSolicitudEnum.Rechazado:
        return 'close-circle';
      default:
        return 'exclamation-circle';
    }
  }

  export function obtenerIconoSolicitud(idTipoSolicitud: number): string {
    switch (idTipoSolicitud) {
      case TipoSolicitudEnum.Inclusion:
        return 'plus';
      case TipoSolicitudEnum.Modificacion:
        return 'sync';
      case TipoSolicitudEnum.Eliminacion:
        return 'delete';
      default:
        return 'exclamation-circle';
    }
  }

  export function obtenerColorEstadoItem(estadoItemId: number): string {
    switch (estadoItemId) {
      case EstadoItemEnum.Activo:
        return 'success';
      case EstadoItemEnum.Deshabilitado:
        return 'default';
      case EstadoItemEnum.Eliminado:
        return 'error';
      case EstadoItemEnum.Suspendido:
        return 'warning';
      default:
        return 'default';
    }
  }

  export function obtenerColorSegumiento(
    idSolicitudEstado: number
  ): 'red' | 'green' | 'blue' | 'grey' | 'gray' {
    switch (idSolicitudEstado) {
      case EstadoSolicitudEnum.Enviado:
      case EstadoSolicitudEnum.Atendido:
        return 'green';
      case EstadoSolicitudEnum.Pendiente:
        return 'blue';
      case EstadoSolicitudEnum.Rechazado:
      case EstadoSolicitudEnum.Anulado:
        return 'red';
      default:
        return 'gray';
    }
  }

  export function obtenerOficinaActual(
    solicitudEstados: SolicitudEstadoDetalle[]
  ): string {
    const estadoActual = solicitudEstados.find(
      (solicitudEstado) => solicitudEstado.esActual
    );

    if (!estadoActual) return '-';

    return estadoActual.oficinaDescripcion;
  }

  export function obtenerEstadoActual(
    solicitudEstados: SolicitudEstadoDetalle[]
  ): SolicitudEstadoDetalle {
    return solicitudEstados.find((solicitudEstado) => solicitudEstado.esActual);
  }

}

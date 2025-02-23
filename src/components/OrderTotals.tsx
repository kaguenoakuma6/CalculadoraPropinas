import { Dispatch, useCallback } from "react"
import { OrderItem } from "../types"
import { formatCurrency } from "../helpers";
import { OrderActions } from "../reducers/order-reducer";

type OrderTotalsProps = {
    order: OrderItem[],
    tip: number,
    dispatch: Dispatch<OrderActions>
}

export default function OrderTotals({ order, tip, dispatch }: OrderTotalsProps) {
    const subtotal = useCallback(() => order.reduce( (total, item) => total + (item.quantity * item.price),0 ), [order]);
    const tipAmount = useCallback(() => subtotal() * tip,[tip, order]);
    const total = useCallback(() => subtotal() + tipAmount(),[tip, order]);

    return (
        <>
            <div className="space-y-3">
                <h2 className="font-black text-2xl">Totales y Propinas</h2>
                <p>Subtotal a Pagar: {''}<span>{ formatCurrency(subtotal())}</span></p>
                <p>Propina: {''}<span>{ formatCurrency(tipAmount()) }</span></p>
                <p>Total a Pagar: {''}<span>{ formatCurrency(total()) }</span></p>
            </div>
            <button className="w-full bg-black p-3 uppercase text-white font-bold mt-10 disabled:opacity-10" 
                disabled={ total() === 0} onClick={ () => dispatch({type: 'place-order'}) }
            >guardar orden</button>
        </>
    )
}

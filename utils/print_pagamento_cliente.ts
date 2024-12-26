import { Cliente, Pagamento } from "@/model/clienti";

    // Funzione di stampa
    export default function handleStampapagamenti(cliente: Cliente, pagamenti: Pagamento[]) {
        const totalePositivo: number = pagamenti.reduce((acc, pagamento) => pagamento.costo > 0 ? acc + (Number(pagamento.costo) || 0) : acc, 0);
        const totaleNegativo: number = pagamenti.reduce((acc, pagamento) => pagamento.costo < 0 ? acc + (Number(pagamento.costo) || 0) : acc, 0);
    
        const printWindow = window.open('', '', 'width=800, height=600');
        const styles = `
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    margin: 40px;
                    color: #333;
                    background-color: #fafafa;
                }
                h2 {
                    text-align: center;
                    color: #fff;
                    background-color: #0066cc;
                    padding: 15px;
                    border-radius: 8px;
                    margin-bottom: 30px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }
                .logo {
                    width: 50px;
                    height: 50px;
                    margin-right: 10px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                    border-radius: 8px;
                    overflow: hidden;
                    border: 1px solid #ddd;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
                }
                th, td {
                    padding: 12px 15px;
                    text-align: left;
                    border: 1px solid #ddd;
                }
                th {
                    background-color: #0066cc;
                    color: white;
                    font-weight: bold;
                }
                tr:nth-child(even) {
                    background-color: #f9f9f9;
                }
                tr:nth-child(odd) {
                    background-color: #ffffff;
                }
                tr:hover {
                    background-color: #e1e1e1;
                }
                td {
                    font-size: 14px;
                    color: #333;
                }
                .totals {
                    margin-top: 40px;
                    text-align: right;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    border-top: 3px solid #0066cc;
                }
                .totals p {
                    font-size: 16px;
                    font-weight: bold;
                    color: #333;
                    margin: 10px 0;
                }
                .totals p span {
                    font-weight: normal;
                    color: #555;
                }
                .total-header {
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 20px;
                    color: #0066cc;
                }
                .page-footer {
                    text-align: center;
                    margin-top: 40px;
                    font-size: 12px;
                    color: #777;
                }
                @media print {
                    body {
                        margin: 0;
                        padding: 0;
                    }
                    .totals {
                        page-break-before: always;
                    }
                }
            </style>
        `;

        printWindow?.document.write('<html><head>' + styles + '</head><body>');
        printWindow?.document.write('<h2>pagamenti Cliente: ' + cliente.nome + ' ' + cliente.cognome + '</h2>');

        // Tabella pagamenti
        printWindow?.document.write('<table><tr><th>Codice</th><th>Descrizione</th><th>Costo</th><th>Data pagamento</th><th>Data Inserimento</th></tr>');
        pagamenti.forEach(pagamento => {
            printWindow?.document.write(`
                <tr>
                    <td>${pagamento.codice}</td>
                    <td>${pagamento.descrizione}</td>
                    <td>${pagamento.costo}</td>
                    <td>${pagamento.dataPagamento}</td>
                    <td>${pagamento.dataInserimento}</td>
                </tr>
            `);
        });

        printWindow?.document.write('</table>');

        // Sezione Totali
        printWindow?.document.write(`
            <div class="totals">
                <div class="total-header">Riepilogo Totale pagamenti</div>
                <p><strong>Totale pagamenti Positive:</strong> € ${totalePositivo.toFixed(2)}</p>
                <p><strong>Totale pagamenti Negative:</strong> € ${totaleNegativo.toFixed(2)}</p>
                <p><strong>Saldo Totale:</strong> € ${(totalePositivo + totaleNegativo).toFixed(2)}</p>
            </div>
        `);

        // Footer
        printWindow?.document.write(`
            <div class="page-footer">
                <p>Stampato il: ${new Date().toLocaleString()}</p>
            </div>
        `);

        printWindow?.document.write('</body></html>');
        printWindow?.document.close();
        printWindow?.print();
    };
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import { MatDialog } from '@angular/material/dialog';
import { ViewComponent } from '../view/view.component';
import 'jspdf-autotable';
import { ComponentType } from '@angular/cdk/portal';
import { auto } from '@popperjs/core';
import autoTable from 'jspdf-autotable';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-jspdf',
  templateUrl: './jspdf.component.html',
  styleUrls: ['./jspdf.component.css'],
})
export class JspdfComponent implements OnInit {
  ngOnInit(): void {}
  constructor(public dialog: MatDialog) {}
  @ViewChild('veiw', { static: false }) el!: ElementRef;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  downpdf() {
    let pdf = new jsPDF('l', 'px', 'a4');
    autoTable(pdf, { html: '#table2' });
    autoTable(pdf, { html: '#table1', styles: { textColor: [250, 0, 0] } });
    autoTable(pdf, { html: '#table2' });
    autoTable(pdf, { html: '#table1' });
    pdf.save();
  }
  openDialog() {
    const dialogRef = this.dialog.open(ViewComponent, { width: '100%' });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  makepdf() {
    let pdf = new jsPDF('l', 'px', 'a4');
    autoTable(pdf, { html: '#table2' });
    autoTable(pdf, { html: '#table1', styles: { textColor: [250, 0, 0] } });
    autoTable(pdf, { html: '#table2' });
    autoTable(pdf, { html: '#table1' });
    window.open(pdf.output('bloburl'), '_blank');
  }
}

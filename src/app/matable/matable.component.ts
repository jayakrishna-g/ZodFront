import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DataserviceService } from '../dataservice.service';

export interface UserData {
  Rank: number;
  HackerrankHandle: string;
  Rating: number;
  TimesPlayed: number;
}

@Component({
  selector: 'app-matable',
  templateUrl: './matable.component.html',
  styleUrls: ['./matable.component.css']
})

export class MatableComponent implements OnInit {
  displayedColumns: string[] = ['Rank', 'HackerrankHandle', 'Rating', 'TimesPlayed'];
  dataSource: MatTableDataSource<UserData>;
  users;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private data: DataserviceService) {
    // Create 100 users
    data.getdata().subscribe((res) => {
      this.users = res;
      // Assign the data to the data source for the table to render
      const ds = [];
      let c = 1;
      let prevR = -1;
      this.users.forEach(element => {
        ds.push({
          Rank: c,
          HackerrankHandle: element.HackerrankHandle,
          Rating: element.Rating,
          TimesPlayed: element.TimesPlayed
        });
        if (prevR !== element.Rating) {
          c++;
          prevR = element.Rating;
        }
      });
      this.dataSource = new MatTableDataSource(ds);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

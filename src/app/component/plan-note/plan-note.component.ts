import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup ,ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TeamCompServiceService } from '../../../Service/TeamComp/team-comp-service.service';
import { PlanNote, TeamComp } from '../../../models/teamcomp';

@Component({
  selector: 'app-plan-note',
  standalone: true,
  imports: [CommonModule, HttpClientModule,ReactiveFormsModule],
  templateUrl: './plan-note.component.html',
  styleUrl: './plan-note.component.css'
})
export class PlanNoteComponent {
  
  constructor( public teamcompService: TeamCompServiceService,  private router: Router, private route2: ActivatedRoute) { }
  newTeamComp: TeamComp |undefined;
  plan:string=""

  ngOnInit() {
    this.route2.params.subscribe(params => {
      this.plan = params['plan'];

    });

  }
  Note=new FormGroup({
    PlanNote: new FormControl(''),
   
   })
  
   SaveData() {
    this.newTeamComp = this.teamcompService.getNewTeamComp();
    let valueNote: string[] = [];
    // Check if this.Note.value.PlanNote is not null or undefined
    if (this.Note.value.PlanNote !== null && this.Note.value.PlanNote !== undefined) {
      valueNote.push(this.Note.value.PlanNote);
        const NoteAdd: PlanNote = {
            stage: this.plan,
            note: valueNote // Assign the value directly
        };
        if(this.newTeamComp!=undefined){
        this.newTeamComp?.plan_note.push(NoteAdd);
        this.teamcompService.setNewTeamComp(this.newTeamComp)
        }
        // Now you can do something with NoteAdd, for example:
        // this.newTeamComp?.plan_note = NoteAdd;
        if(this.plan!="mid"){
          Swal.fire({
            title: 'Success!',
            text: 'Form submitted successfully! At the next step ,please give me formation at mid phase',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.router.navigate(['/Build', "mid"]);
        }
        else{
          this.newTeamComp = this.teamcompService.getNewTeamComp();
          if(this.newTeamComp!=undefined){
            this.teamcompService.CreateTeamComp(this.newTeamComp);
          }
          Swal.fire({
            title: 'Success!',
            text: 'Add TeamComp Success',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.router.navigate(['/Home']);
        }
    }
    else{
      Swal.fire({
        title: 'Error!',
        text: 'Please fill all input',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
}

}

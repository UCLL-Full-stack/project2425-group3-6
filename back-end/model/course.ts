class Course {
    private id?: number;
    private name: string;
    private description: string;
    private phase: number;
    private credits: number;
  
    public constructor(course: { id?: number; name: string; description: string; phase: number; credits: number }) {
        this.id = course.id;
        this.name = course.name;
        this.description = course.description;
        this.phase = course.phase;
        this.credits = course.credits;
    }

    public getId(): number {
        if (this.id){
            return this.id;
        }
        return 0;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getPhase(): number {
        return this.phase;
    }

    public getCredits(): number {
        return this.credits;
    }

    equals(otherCourse: { id: number; name: string; description: string; phase: number; credits: number }): boolean {
        return this.name === otherCourse.name && this.description === otherCourse.description && this.phase === otherCourse.phase && this.credits === otherCourse.credits
      }
    
}

  
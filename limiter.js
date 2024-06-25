class Limiter{
    constructor(limit, interval) {
        this.limit = limit;
        this.interval = interval; 
        this.tokens = limit; 
        this.lastRefill = Date.now();
    }
    consume(){
        if(this.tokens > 0){
            this.tokens--;
            return true;
        }
        return false;
    }
    refill(){
        const passedTime = Date.now()-this.lastRefill;
        const tokensToAdd = Math.floor(passedTime/this.interval);
        console.log("guuggu = " + passedTime);
        if(tokensToAdd == 0) return;
        this.tokens = Math.min(this.limit,this.tokens+tokensToAdd);
        this.lastRefill = Date.now();
    }
}

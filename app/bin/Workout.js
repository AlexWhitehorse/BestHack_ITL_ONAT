class Workout{
    constructor(client){
        this.client = client;
    }

    getClientWorkout(id){
        return new Promise((resolve, reject) => {
            if(!id) resolve({status: false, code: 500});
            const sql = `select cl.name as user_name,
            tr.start_time,
            tr.end_time,
            tr.discription,
            tnr.name as traineer,
            tr.link_url,
            tr.name as train_name,
            tr.online,
            cl.weigth, 
            cl.height, 
            cl.brest_v, 
            cl.body_v, 
            cl.ass_v, 
            cl.avatar_url, 
            cl.want_brest, 
            cl.waht_body, 
            cl.want_weight, 
            cl.want_ass
            
            from
                client as cl
            join 
                train_user as t_u
            on t_u.user_id = cl.user_id
            left join 
                train as tr
            on tr.train_id = t_u.train_id
            left join 
                taineer as tnr 
            on tnr.traineer_id = tr.traineer_id
            where tr.online = true
                and cl.user_id = ${id}
            order by tr.start_time
            
            `;

            this.client.query(sql).then(result => {
                resolve({status: true, code: 200, data: result.rows});
            }).catch(error => {
                console.log(error);
                resolve({status: false, code: 500, error: error});
            });
        });
    }
    
}

module.exports = Workout;
// AudioManager: sonidos sintetizados originales para NEXUS.OS.
class AudioManager {
  constructor(){this.ctx=null;this.enabled=localStorage.getItem('nexus_sound')!=='off';this.volume=Number(localStorage.getItem('nexus_volume')||0.16)}
  ensure(){if(!this.enabled)return null;const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return null;try{if(!this.ctx)this.ctx=new AC();if(this.ctx.state==='suspended')this.ctx.resume();return this.ctx}catch{return null}}
  tone(freq,start,duration,type='sine',peak=this.volume){const c=this.ensure();if(!c)return;try{const o=c.createOscillator(),g=c.createGain(),t=c.currentTime+start;o.type=type;o.frequency.setValueAtTime(freq,t);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(Math.max(.0002,peak),t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+duration);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+duration+.02)}catch{}}
  playMove(){this.tone(540,0,.055,'sine',this.volume*.55)}
  playSelect(){this.tone(520,0,.09,'triangle');this.tone(660,.075,.12,'triangle',this.volume*.75)}
  playBack(){this.tone(440,0,.07,'sine',this.volume*.5);this.tone(330,.06,.1,'sine',this.volume*.45)}
  playStartup(){this.tone(392,0,.12,'sine',this.volume*.5);this.tone(587,.13,.2,'triangle',this.volume*.6)}
  setEnabled(v){this.enabled=!!v;localStorage.setItem('nexus_sound',this.enabled?'on':'off');if(this.enabled)this.ensure()}
  setVolume(v){this.volume=Math.max(0,Math.min(.5,Number(v)));localStorage.setItem('nexus_volume',String(this.volume))}
}
const audio=new AudioManager();
document.addEventListener('pointerdown',()=>audio.ensure(),{once:true,passive:true});

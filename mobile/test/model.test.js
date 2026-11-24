const test=require('node:test');const assert=require('node:assert/strict');const {timeline,replies,profilePosts,normalizeHandle,validateProfile,descendants}=require('../src/model');
const posts=[{id:'a',authorId:'a',createdAt:1,images:[]},{id:'b',parentId:'a',authorId:'b',createdAt:2,images:[]},{id:'c',parentId:'b',authorId:'a',createdAt:3,images:['a.jpg']},{id:'d',authorId:'b',createdAt:4,images:[]},{id:'e',parentId:'a',authorId:'b',createdAt:5,images:[]}];
test('timeline roots only',()=>assert.deepEqual(timeline(posts).map(p=>p.id),['d','a']));
test('thread parents',()=>{assert.deepEqual(replies(posts,'a').map(p=>p.id),['b','e']);assert.deepEqual(replies(posts,'b').map(p=>p.id),['c']);});
test('profile tabs',()=>{assert.deepEqual(profilePosts(posts,'a').map(p=>p.id),['a']);assert.deepEqual(profilePosts(posts,'a','replies').map(p=>p.id),['c']);assert.deepEqual(profilePosts(posts,'a','media').map(p=>p.id),['c']);});
test('delete descendants',()=>assert.deepEqual(descendants(posts,'a').sort(),['a','b','c','e']));
test('handle normalization and validation',()=>{assert.equal(normalizeHandle(' @nico '),'nico');assert.equal(validateProfile({id:'1',name:'Nico',handle:'nico'},[]),'');assert.ok(validateProfile({id:'2',name:'Nico',handle:'NICO'},[{id:'1',handle:'nico'}]));});

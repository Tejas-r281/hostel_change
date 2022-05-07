#include<bits/stdc++.h>
using namespace std;

// create a linked list of type int
struct node{
    int data;
    struct node *next;

};
// return index of max element in the linked list
int max_index(struct node *head){
    int max_index = 0;
    int max_element = INT_MIN;
    struct node *temp = head;
    int count=0;
    while(temp != NULL){
        if(temp->data > max_element){
            max_element = temp->data;
            max_index = count;
        }
        count++;
        temp = temp->next;
    }
    return max_index;
}
// return index of min element in the linked list
int min_index(struct node *head){
    int min_index = 0;
    int min_element = INT_MAX;
    struct node *temp = head;
    int count=0;
    while(temp != NULL){
        if(temp->data < min_element){
            min_element = temp->data;
            min_index = count;
        }
        count++;
        temp = temp->next;
    }
    return min_index;
}
int main()
{
    // create a linked list where while loop will terminate only when the user enters -5 as the data
    struct node *head = NULL;
    struct node *temp = NULL;
    struct node* tail=NULL;
    int data;
    while(1)
    {
        // cout<<"Enter the data: ";
        cin>>data;
        if(data == -5)
            break;
        temp = new node;
        temp->data = data;
        temp->next = NULL;
        if(head == NULL)
           tail= head = temp;
        else
        {
            tail->next = temp;
            tail = temp;
            // head = temp;
        }
    }
//    recieve the index of max and min element in the linked list
    int max_ind = max_index(head);
    int min_ind = min_index(head);

    // just make sure the that min_index should smallest of both the given index for easiness of printing the values 
    if(min_ind>max_ind)
        swap(min_ind,max_ind);
//   print the element between two give indexes
    struct node *temp1 = head;
    int count = 0;
    while(temp1 != NULL){
        if(count >= min_ind && count <= max_ind){
            cout<<temp1->data<<" ";
        }
        count++;
        temp1 = temp1->next;
    }
    return 0;



}